from marshmallow import Schema, fields

class Data(Schema):
  seed=fields.Str()
  asize=fields.Str()
  psize=fields.Str()
  address=fields.Str()
  len0=fields.Str()
  len1=fields.Str()
  base0=fields.Str()
  base1=fields.Str()
  numaddrs=fields.Str()