import React, { Component } from 'react'

export default class Slide extends Component {
    render() {

        const { open } = this.props
        return (
            <div id="slide-user">
                <div className={"slide " + (open ? ' open ' : '')}>
                    <ul>
                        <li className="__item-slide">
                            name
                        </li>
                        <li className="__item-slide">
                            name
                        </li>
                        <li className="__item-slide">
                            name
                        </li>
                        <li className="__item-slide">
                            name
                        </li>
                        <li className="__item-slide">
                            name
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}
