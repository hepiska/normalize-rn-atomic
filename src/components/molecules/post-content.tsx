import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { colors } from '@utils/constants'
import Html from 'react-native-render-html'
import { fontStyle } from '@components/commont-styles'
import Jumbotron from './post-content-jumbotron'
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

const renderBlockQuote = (props, children, data, passProps) => {
  const content = passProps.html.match(
    /<figure class=\"media\"><blockquote (.|\n)*?<\/figure>/g,
  )
  // console.log('==blockquote====', passProps)

  return null
}

const PostContent = ({ content, style }: any) => {
  const changeContent = inserjumbotron(content)
  return (
    <View style={style}>
      <Html
        renderers={{
          jumbotron: renderJumbotron,
          oembed: renderoembed,
          figure: renderBlockQuote,
        }}
        imagesMaxWidth={Dimensions.get('window').width - 32}
        decodeEntities={false}
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
