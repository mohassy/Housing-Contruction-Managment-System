from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class rankProxRequest(_message.Message):
    __slots__ = ("rankPlease",)
    RANKPLEASE_FIELD_NUMBER: _ClassVar[int]
    rankPlease: str
    def __init__(self, rankPlease: _Optional[str] = ...) -> None: ...

class rankedProxResponse(_message.Message):
    __slots__ = ("rankedAreas", "rankings", "rankedResponse")
    RANKEDAREAS_FIELD_NUMBER: _ClassVar[int]
    RANKINGS_FIELD_NUMBER: _ClassVar[int]
    RANKEDRESPONSE_FIELD_NUMBER: _ClassVar[int]
    rankedAreas: str
    rankings: float
    rankedResponse: str
    def __init__(self, rankedAreas: _Optional[str] = ..., rankings: _Optional[float] = ..., rankedResponse: _Optional[str] = ...) -> None: ...
