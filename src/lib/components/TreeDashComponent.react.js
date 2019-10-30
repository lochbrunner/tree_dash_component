import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'core-js/stable';
import 'regenerator-runtime/runtime';


function* traverse_bfs(node) {
    // Return line by line
    let even = [];
    let id = 0;
    let odd = [{ node, id }];

    while (odd.length > 0) {
        yield odd;
        while (odd.length > 0) {
            const { node } = odd.shift();
            ++id;
            even.push(...(node.childs.map(c => ({ node: c, id }))));
        }
        if (even.length < 1)
            break;

        yield even;
        while (even.length > 0) {
            const { node } = even.shift()
            ++id;
            odd.push(...(node.childs.map(c => ({ node: c, id }))));
        }
    }
}

function calcDepth(node) {
    let max_depth = 0;
    const stack = [{ node, depth: 1 }];
    while (stack.length > 0) {
        const { node, depth } = stack.pop();
        if (depth > max_depth)
            max_depth = depth;
        stack.push(...(node.childs.map(node => ({ node, depth: depth + 1 }))));
    }
    return max_depth;
}

function padding(a, b) {
    const PADDING = 10;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const mx = PADDING * dx / d;
    const my = PADDING * dy / d;
    return { x1: a.x - mx, x2: b.x + mx, y1: a.y - my, y2: b.y + my };
}

function create_image(symbol) {
    const depth = calcDepth(symbol);
    const HEIGHT = 256;
    const WIDTH = 256;
    let i = 0;
    const dict = {};
    const points = [];
    const edges = [];
    let y = HEIGHT / depth / 2;
    const dy = HEIGHT / depth;
    for (let line of traverse_bfs(symbol)) {
        const cx = line.length;
        let x = WIDTH / cx / 2;
        const dx = WIDTH / cx;
        for (let col in line) {
            ++i;
            const { node, id } = line[col];
            points.push(<text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle">{node.ident}</text>);
            dict[i] = { x, y };
            if (id in dict) {
                // Draw line
                const p = dict[id];
                edges.push(<line key={i} {...padding(p, { x, y })} stroke="black" strokeWidth="1.2" />);
            }
            x += dx;
        }
        y += dy;
    }

    const image = <svg width={WIDTH} height={HEIGHT}>
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#eee" />
        {points}
        {edges}
    </svg>;

    return image;
}

export default class TreeDashComponent extends Component {
    render() {
        const { id, symbol } = this.props;

        const image = create_image(symbol);

        return (
            <div id={id}>
                {image}
            </div>
        );
    }
}

TreeDashComponent.defaultProps = {};

TreeDashComponent.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,
    symbol: PropTypes.object,
    setProps: PropTypes.func
};
