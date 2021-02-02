import React from 'react'

import './style.less'

export default class EndCard extends React.Component {
  render() {
    return (
      <div className="endCardContainer">
        <div style={{ margin: '1.8em 1.4em' }}>
          <p style={{ fontSize: '1.3em', fontWeight: 'bolder' }}>
            没有更多内容了...
          </p>
          <p>对于如何改进Genial有什么意见或建议吗？</p>
          <button className="feedbackBtn">
            <p style={{ color: '#333366', margin: 0 }}>
              <a
                href="mailto:simonmmm@126.com?cc=zhouhoushu@126.com"
                rel="nofollow"
              >
                提供反馈
              </a>
            </p>
          </button>
        </div>
      </div>
    )
  }
}
