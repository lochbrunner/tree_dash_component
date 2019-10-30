# AUTO GENERATED FILE - DO NOT EDIT

treeDashComponent <- function(id=NULL, symbol=NULL) {
    
    props <- list(id=id, symbol=symbol)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'TreeDashComponent',
        namespace = 'tree_dash_component',
        propNames = c('id', 'symbol'),
        package = 'treeDashComponent'
        )

    structure(component, class = c('dash_component', 'list'))
}
