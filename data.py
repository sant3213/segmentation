from marshmallow import Schema, fields


class Data(Schema):
    error = fields.Str()
    seed = fields.Str()
    asize = fields.Str()
    psize = fields.Str()
    address = fields.Str()
    len0 = fields.Str()
    len1 = fields.Str()
    base0 = fields.Nested("Base0")
    base1 = fields.Nested("Base1")
    numaddrs = fields.Str()
    virtualAddressTrace = fields.List(fields.Nested("Addressess"))


class Addressess(Schema):
    hexa = fields.Str()
    decimal = fields.Str()
    hexaValid = fields.Str()
    decimalValid = fields.Str()

class Base0(Schema):
    hexa = fields.Str()
    decimal = fields.Str()
    isPositive = fields.Bool()

class Base1(Schema):
    hexa = fields.Str()
    decimal = fields.Str()
    isPositive = fields.Bool()