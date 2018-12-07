'use strict';

import React, { Component } from 'react';

import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage';
import {showLoginPage, isLogin} from  '../actions/loginAction';
import URLConf from '../api/URLConf';
import {getToken} from '../util/Secret';
import Md5 from '../util/Md5';


const avatar_thumbnail = '?imageView2/1/w/48/h/48';

class CommentCell extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loginRegPageVisible: false,
    };
  }

  onPress() {
    const {status,showLoginPage} = this.props;
    if(status == 'NOT_LOGGED_IN') {
      showLoginPage();
      return;
    }
    this.props.reply(this.props.comment);
  }

  renderAuthorName(comment) {
    if(comment.comment_parent_author_name != undefined && comment.comment_parent_author_name != null) {
      return (<View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.username}>{comment.comment_author_name}</Text>
                <Text style={{fontSize: 14, color: '#9B9B9B', bottom: 1}}> 回复 </Text>
                <Text style={styles.username}>{comment.comment_parent_author_name}</Text>
              </View>
            );
    } else {
      return (<Text style={styles.username}>{this.props.comment.comment_author_name}</Text>);
    }

  }

  render(){
    const {status} = this.props;
    return (
      <View >
        {status == 'NOT_LOGGED_IN' && <LoginPage {...this.props}/>}
        <TouchableOpacity onPress={()=>this.onPress()}>
          <View style={styles.commentBox}>
            <Image style={styles.avatar} source={{uri:URLConf.IMG_BASE_URL+this.props.comment.comment_author_avatar+avatar_thumbnail}} />
            <View style={{flex:1}}>
                {this.renderAuthorName(this.props.comment)}
                <Text style={styles.comment}>{this.props.comment.comment_content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    flexDirection: 'row',
    //borderColor: 'black',
    //borderWidth: 1,
    padding: 10,
    paddingBottom: 4,
  },
  avatar: {
    borderRadius: 16,
    width: 32,
    height: 32,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    // lineHeight: 13,
    marginBottom: 4,
  },
  commentTime: {

  },
  comment: {
    fontSize: 14,
    color: '#030303',
    lineHeight: 18,
  },
});


export default connect((state) => ({
  status: state.isLogin.status, //登录状态
  loginPageVisible: state.showLoginPage.loginPageVisible
}), (dispatch) => ({
  isLogin: () => dispatch(isLogin()),
  showLoginPage: () => dispatch(showLoginPage()),
}))(CommentCell)
