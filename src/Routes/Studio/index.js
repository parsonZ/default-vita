import React from 'react';
import { hot } from 'react-hot-loader/root'
import { useSelector } from 'react-redux'

const Studio = () => {
    const store = useSelector(state => state)

    return (
        <main>
            <div>{store.Article.current.msg}</div>
        </main>
    )
}

export default hot(Studio)
