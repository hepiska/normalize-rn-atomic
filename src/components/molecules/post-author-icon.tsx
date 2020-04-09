import React from 'react'
import {
  Div,
  TouchableWithoutFeedback,
  Image,
  Font,
} from '@components/atoms/basic'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

interface AuthorProfileIconProps {
  author: any
  style?: any
  onPress?: Function
}

class AuthorProfileIcon extends React.PureComponent<
  AuthorProfileIconProps,
  any
> {
  _onPress = () => {
    // if (this.props.onPress) {
    //   this.props.onPress({ id: this.props.id, slug: this.props.slug });
    // }
  }

  render() {
    const { author } = this.props
    return author ? (
      <TouchableWithoutFeedback justify="flex-start" align="flex-start">
        <Div _width="100%" _height="30px" _direction="row">
          <Image
            _width="22px"
            _height="22px"
            radius="12px"
            source={{ uri: author && author.photo_url }}
          />
          <Font fontSize="1.05rem" color="#333" _margin="4px 0px">
            {author.name}
          </Font>
        </Div>
      </TouchableWithoutFeedback>
    ) : null
  }
}

const mapStateToProps = (state, ownProps) => ({
  author: state.user.data[ownProps.author],
})

export default connect(mapStateToProps, null)(AuthorProfileIcon)
