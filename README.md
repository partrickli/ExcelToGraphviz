# ExcelToGraphviz

Tool for converting excel sheet to graphviz format.

## Input data

![data](./images/data.png)

Excecute command as follows.

> node convert.js

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
