import React from 'react';
import { hot } from 'react-hot-loader/root'
import Banner from '@src/Aragorn/Common/Banner'

const slides = [
    {
      title: '姓名',
      details: 'parsonz',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
    },
    {
      title: '地址',
      details: '北京',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
    },
    {
      title: '技能',
      details: '全站',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
    },
    {
      title: '学历',
      details: '清华大学',
      img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
    }
]

const Home = () => {
    return (
        <main>
            <Banner slides={slides} />
        </main>
    )
}

export default hot(Home)