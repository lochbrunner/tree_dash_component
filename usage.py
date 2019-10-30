#!/usr/bin/env python3

import tree_dash_component
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)


class Node:
    def __init__(self, ident, childs=[]):
        self.ident = ident
        self.childs = childs

    def obj(self):
        return {'ident': self.ident, 'childs': [child.obj() for child in self.childs]}


node = Node('a', [Node('b', [Node('e'), Node('f')]),
                  Node('c', [Node('g'), Node('h', [Node('x', [Node('y')])])])])


app.layout = html.Div([
    tree_dash_component.TreeDashComponent(
        id='symbol',
        symbol=node.obj()
    )
])


if __name__ == '__main__':
    app.run_server(debug=True)
