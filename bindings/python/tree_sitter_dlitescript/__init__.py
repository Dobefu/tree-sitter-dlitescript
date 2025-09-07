"""A delightfully simple scripting language"""

from ._binding import language

def __getattr__(name):
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

__all__ = [
    "language",
]

def __dir__():
    return sorted(__all__ + [
        "__all__", "__builtins__", "__cached__", "__doc__", "__file__",
        "__loader__", "__name__", "__package__", "__path__", "__spec__",
    ])
