import React, { Component } from 'react'
let raf

export class Fallback extends Component {
    componentDidMount() {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => { 
            if (document.getElementById('loading')) {
                document.getElementById('loading').style.visibility = 'visible'
            }
        })
    }
    componentWillUnmount() {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
            if (document.getElementById('loading')) {
                document.getElementById('loading').style.visibility = 'hidden'
            }
        })
    }
    render() {
        return null
    }
}

export const fallback = <Fallback />

const options = {
    fallback
}

export default options
