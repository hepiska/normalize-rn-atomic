import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavbarTop from '@src/components/molecules/navbar-top'
import PostDetailLoader from '@components/atoms/loaders/post-detail'
import { colors } from '@utils/constants'
import List from '@components/layouts/list-header'
import PostDetailOrg from '@components/organisms/post-detail'
import {
  removeHeaderWebviewScript,
  clearLocalStorageScript,
  injectTokenScript,
} from '@utils/helpers'
import { getPostById, getNextPost } from '@modules/post/action'
import { postListData } from '@hocs/data/post'

const PostDetailWithData = postListData(PostDetailOrg)

const PostDetailPage = props => {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeposts, setActivePost] = useState([])
  const { post, url, getPostById, getNextPost, postId, route } = props

  useEffect(() => {
    if (postId) {
      getPostById(postId, res => {
        setLoading(res.loading)
        if (res.status === 'success') {
          setActivePost(postids => {
            return [...postids, res.data.result]
          })
          setTitle(_title => res.data.entities.post[res.data.result].title)
        }
      })
    } else {
      getPostById(
        route.params.postSlug,
        res => {
          setLoading(res.loading)
          if (res.status === 'success') {
            setActivePost(postids => {
              return [...postids, res.data.result]
            })
            setTitle(_title => res.data.entities.post[res.data.result].title)
          }
        },
        { id_type: 'slug' },
      )
    }

    return () => {}
  }, [])

  const _renderItem = useMemo(
    () => ({ item }) => {
      return <PostDetailWithData postId={item} />
    },
    [],
  )

  const _onReachEnd = useCallback(() => {
    if (!loading) {
      getNextPost(activeposts[activeposts.length - 1], res => {
        setLoading(res.loading)
        if (res.status === 'success') {
          setActivePost(postids => {
            return [...postids, res.data.result]
          })
          setTitle(_title => res.data.entities.post[res.data.result].title)
        }
      })
    }
  }, [activeposts, loading])

  const _keyExtractor = useMemo(() => item => 'post-detail' + item, [
    activeposts,
  ])

  return (
    <>
      <NavbarTop title={title} leftContent={['back']} />
      <List
        data={activeposts}
        showScrollIndicator={false}
        onEndReached={_onReachEnd}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={_keyExtractor}
      />
    </>
  )

  // return null
}
const mapStateToProps = (state, ownProps) => {
  let post = null
  const { params } = ownProps.route
  const postId = params.postId || null
  const activePost = state.post.activePost
  if (postId) {
    post = state.post.data[postId] || null
  }
  return {
    post,
    activePost,
    postId,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPostById, getNextPost }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailPage)
