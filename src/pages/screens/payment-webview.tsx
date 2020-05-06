import React, { Component } from 'react'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { colors } from '@utils/constants'
import { queryStringToObj } from '@utils/helpers'
import NavbarTop from '@src/components/molecules/navbar-top'
import { payTransaction } from '@modules/transaction/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { midtransService } from '@utils/services'

const midTransHtml: string = `<html> 
<head>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
<script id= "midtrans-script" src="https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js" data-environment=${Config.MIDTRANS_ENV} data-client-key=${Config.MIDTRANS_CLIENT_KEY} type="text/javascript"></script>
</head>
<body>
</body>
<html>`

const midTransGetToken = data => `(function() {
  window.MidtransNew3ds.getCardToken({card_number:${data.card_number},card_cvv:${data.cvv},card_exp_month:${data.card_exp_month}, card_exp_year:${data.card_exp_year} },{onSuccess:function(res){
    window.ReactNativeWebView.postMessage(JSON.stringify({res, type: 'midTransGetToken', status:'success'}))
    true;
  }, onFailure:function(res){
    window.ReactNativeWebView.postMessage(JSON.stringify({res, type: 'midTransGetToken', status:'failed'}))
    true;
  } })
})(); true;`

const midTransAuthenticate = uri => `(function(){
  var ifrm = document.createElement("iframe");
  ifrm.style.possition="absolute"
  ifrm.style.backgroundColor="white"
  ifrm.style.width = window.innerWidth - 24;
  ifrm.style.height = innerHeight -48;
  window.MidtransNew3ds.authenticate("${uri}",{
    performAuthentication:function(res){
      ifrm.setAttribute("src", "${uri}");    
      document.body.appendChild(ifrm)
    },
    onPending: function(res) {
      window.ReactNativeWebView.postMessage(JSON.stringify({res, type: 'authenticate', status:'pending'}))
    },
    onFailure: function(res) {
      window.ReactNativeWebView.postMessage(JSON.stringify({res, type: 'authenticate', status:'failed'}))
    },onSuccess: function(res){
      window.ReactNativeWebView.postMessage(JSON.stringify({res, type: 'authenticate', status:'success'}))
    }
  })
})()`

const getCreditCardValue = data => {
  const ccPrams = {}
  Object.keys(data).forEach(key => {
    if (key === 'card_number') {
      ccPrams[key] = data[key].value.replace(/[\s]/gi, '')
    } else {
      ccPrams[key] = data[key].value
    }
  })
  return ccPrams
}

class PaymentWebView extends Component<any, any> {
  state = {
    midtransUri: null,
  }
  timeout = null
  _redirect = navState => {
    if (navState.url.includes(Config.SHONET_URI)) {
      const uri = navState.url.replace(Config.SHONET_URI + '/', '')
      const splitedUri = uri.split('/')
      const transIdAndParamsUri = splitedUri[splitedUri.length - 1]
      const [transactionId, query] = transIdAndParamsUri.split('?')
      const params = queryStringToObj(query)
      if (transactionId) {
        this.props.navigation.replace('PaymentResponse', {
          ...params,
          transactionId: transactionId,
        })
      }
    }
  }

  webref = null

  componentDidMount() {
    const { route, transaction } = this.props

    const { type } = route.params
    if (type.toLowerCase() === 'credit card') {
      if (transaction.redirect_url) {
        const authScript = midTransAuthenticate(transaction.redirect_url)

        this._injectJavaScript(authScript)
      } else {
        this.getCartToken()
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.transaction.payment_type !== 'credit_card') {
      return null
    }
    if (
      prevProps.transaction.redirect_url !== this.props.transaction.redirect_url
    ) {
      this._injectJavaScript(
        midTransAuthenticate(this.props.transaction.redirect_url),
      )
    }
  }

  _setMidtransrUri = uri => {
    this.setState({ midtransUri: uri })
  }

  _fetchMidtrans = data => {
    const midtransDefault = {
      callback: 'MidtransNew3ds.callback',
      client_key: Config.MIDTRANS_CLIENT_KEY,
    }
    midtransService
      .request({
        url: '/v2/token',
        params: { ...midtransDefault, ...data },
      })
      .then(data => {
        const dataObj = JSON.parse(data.data.match(/(\{.*?\})/g)[0])
        const midtransUri = `${Config.MIDTRANS_URI}/v2/token/rba/callback/${dataObj.token_id}`

        this.setState({ midtransUri })
      })
  }

  _injectJavaScript = (script: string) => {
    this.timeout = setTimeout(() => {
      this.webref.injectJavaScript(script)
    }, 1000)
  }

  getCartToken = () => {
    const { route } = this.props
    const { uri, type, dataCreditCard } = route.params
    const ccData: any = getCreditCardValue(dataCreditCard)
    ccData.card_exp_month = ccData.expired_date.slice(0, 2)
    ccData.card_exp_year = '20' + ccData.expired_date.slice(2)
    const script = midTransGetToken(ccData)
    this._injectJavaScript(script)
  }

  _updateTransaction = async token_id => {
    const { route, payTransaction, transaction } = this.props
    const { uri, type, method } = route.params
    await payTransaction(transaction.id, method.id, token_id)
  }

  _onMessage = event => {
    const { transaction } = this.props
    const data = JSON.parse(event.nativeEvent.data)
    switch (data.type.toLowerCase()) {
      case 'midtransgettoken':
        this._updateTransaction(data.res.token_id)
        break
      case 'authenticate':
        if (transaction.id) {
          this.props.navigation.replace('PaymentResponse', {
            transactionId: transaction.id,
          })
        }
        break
      default:
        break
    }
  }

  render() {
    const { route, transaction } = this.props
    const { midtransUri } = this.state
    const { uri, type } = route.params
    const source: any = { uri }
    if (type.toLowerCase() === 'credit card') {
      if (midtransUri) {
        source.uri = midtransUri
      } else {
        source.html = midTransHtml
        delete source.uri
      }
    }

    return (
      <>
        <NavbarTop
          title="Payment"
          leftContent={['back']}
          style={{ borderBottomWidth: 1, borderBottomColor: colors.black50 }}
        />
        <WebView
          ref={r => (this.webref = r)}
          source={source}
          onMessage={this._onMessage}
          onNavigationStateChange={this._redirect}
          originWhitelist={['https://*']}
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      payTransaction,
    },
    dispatch,
  )

const mapStateToProps = (state, ownProps) => {
  const transaction =
    state.transaction.data[ownProps.route.params.transactionId]
  return {
    transaction,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWebView)
