# AUTO GENERATED FILE - DO NOT EDIT

treeDashComponent <- function(id=NULL, label=NULL, value=NULL) {
    
    props <- list(id=id, label=label, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'TreeDashComponent',
        namespace = 'tree_dash_component',
        propNames = c('id', 'label', 'value'),
        package = 'treeDashComponent'
        )

    structure(component, class = c('dash_component', 'list'))
}
