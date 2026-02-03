from dataclasses import dataclass
from typing import Any


@dataclass
class Identifier:
    name: str


@dataclass
class Literal:
    value: Any


@dataclass
class BinaryExpression:
    left: Any
    operator: str
    right: Any


@dataclass
class Assignment:
    target: Identifier
    value: Any


@dataclass
class IfStatement:
    condition: str


@dataclass
class ForLoop:
    iterator: str
    iterable: str


@dataclass
class WhileLoop:
    condition: str
