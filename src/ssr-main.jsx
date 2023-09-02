import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Index from './pages/home'
import './reset.less'

export function render(url) {
    console.log('ssr, redner url', url)

    return ReactDOMServer.renderToString((
        <React.StrictMode>
            <Index />
        </React.StrictMode>
    ))
}