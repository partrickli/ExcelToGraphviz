# ExcelToGraphviz

Tool for converting excel sheet to graphviz format.

## Input data

The excel file contains lines, which describing link between nodes.
![data](./images/data.png)

Excecute command as follows.

> node convert.js data.xlsx

The second argument work as input link data source. `data.xlsx`

## Output graphviz dot file

```
digraph {
    rankdir=LR
    A -> B
    A -> C
    B -> X
    B -> Y
    B -> Z
    C -> O
    C -> P
    C -> Q
}
```

## Output Image

![graphviz](./images/demo.png)
