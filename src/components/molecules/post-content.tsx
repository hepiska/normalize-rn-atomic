import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { colors } from '@utils/constants'
import Html from 'react-native-render-html'
import { fontStyle } from '@components/commont-styles'
import Jumbotron from './post-content-jumbotron'
import { navigate, push } from '@src/root-navigation'
import Oembed from './oembed'
// import HTMLView from 'react-native-htmlview'
import Config from 'react-native-config'
import PostContentProduct from './post-content-product'
const inserjumbotron = (content: string) => {
  return content.replace(/<p>\s*<\/p>/, '<p></p> <jumbotron /></jumbotron>')
}

const renderJumbotron = props => <Jumbotron {...props} />
const renderoembed = props => {
  if (props.url.includes(Config.SHONET_URI + '/products')) {
    const slug = props.url.replace(Config.SHONET_URI + '/products/', '')

    return <PostContentProduct key={slug} slug={slug} />
  } else {
    return <Text>sasasa</Text>
  }
}

// const renderoembed = props => (
//   <View style={{ backgroundColor: 'red' }}>
//     <Text>sasasa</Text>
//   </View>
// )

const renderBlockQuote = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Screens', {
          screen: 'WebView',
          params: {
            uri: props['data-instgrm-permalink'],
          },
        })
      }>
      <Text>{props['data-instgrm-permalink']}</Text>
    </TouchableOpacity>
  )
}

const PostContent = ({ content, style }: any) => {
  const changeContent = inserjumbotron(content)
  return (
    <View style={style}>
      <Html
        renderers={{
          jumbotron: renderJumbotron,
          oembed: renderoembed,
          blockquote: renderBlockQuote,
        }}
        imagesMaxWidth={Dimensions.get('window').width - 32}
        onLinkPress={(e, href) => {
          if (href.includes(Config.SHONET_URI + '/products/')) {
            const slug = href.replace(Config.SHONET_URI + '/products/', '')
            navigate('Screens', {
              screen: 'ProductDetail',
              params: { productSlug: slug },
            })
          } else if (href.includes(Config.SHONET_URI + '/articles/')) {
            console.log('=====masuk sini')
            const slug = href.replace(Config.SHONET_URI + '/articles/', '')
            push('Screens', {
              screen: 'PostDetail',
              params: { postSlug: slug },
            })
          }
        }}
        tagsStyles={{
          p: {
            ...fontStyle.ChronicleDisplay,
            fontSize: 18,
            marginTop: 20,
            lineHeight: 30,
            color: colors.black100,
          },

          img: {
            borderRadius: 8,
          },
          a: {
            ...fontStyle.ChronicleDisplay,
            fontSize: 18,
            marginTop: 20,
            color: colors.black100,
            lineHeight: 30,
          },
        }}
        html={changeContent}
      />
    </View>
  )
}

export default PostContent
