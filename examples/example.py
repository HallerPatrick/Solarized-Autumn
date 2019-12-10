import functools
import json


class Foo:

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Foo {self.x} {self.y}"

    def bar(self):
        return "Hello World"


def main():
    foo = Foo(1, 2)

    foo.bar()

    print(foo)


if __name__ == "__main__":
    main()
