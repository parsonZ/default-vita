import React, { Component } from 'react'
import { Skeleton } from 'antd';
let raf

export class Fallback extends Component {
    constructor () {
        super()
        this.state = {
            showSkeleton: false
        }
    }
    componentDidMount() {
        this.setState({
            showSkeleton: true
        })
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => { 
            if (document.getElementById('loading')) {
                document.getElementById('loading').style.visibility = 'visible'
            }
         })
    }
    componentWillUnmount() {
        this.setState({
            showSkeleton: false
        })
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
            if (document.getElementById('loading')) {
                document.getElementById('loading').style.visibility = 'hidden'
            }
        })
    }
    render() {
        return this.state.showSkeleton ? <Skeleton /> : null
    }
}

export const fallback = <Fallback />

const options = {
    fallback
}

export default options
