import React from 'react'
import {renderToPipeableStream} from 'react-dom/server'
import Index from './pages/home'
import {Writable} from 'node:stream'
import './reset.less'

export async function render(url) {
    console.log('ssr, redner url', url)

    let stream = renderToPipeableStream((
        <React.StrictMode>
            <Index />
        </React.StrictMode>
    ), {
        onShellReady() {
            console.log("on shell ready")
        },
        onAllReady() {
            console.log("on all ready")
        }
    })

    return new Promise((resolve, reject) => {
        let html = '';

        let w = new Writable({
            write(chunk, _, next) {
                html += chunk;
                next()
                console.log("[chunk]")
            },
        })
        w.on('error', (e) => {
            console.log('[error]', e)
            reject(e)
        })

        // 只有成功的结束时 才被执行
        w.on('finish', () => {
            console.log("[finish]")
            resolve(html)
        })

        w.on('close', () => {
            console.log("[close]")
        })

        stream.pipe(w)
    })
}