// @ts-nocheck
/* Javascript output generated by archetype 1.4.1 */

/* Utils functions */

export const mk_int    = v  => {return { "int" : v.toString() }}
export const mk_string = v  => {return { "string" : v }}
export const mk_bytes  = v  => {return { "bytes" : v.toString() }}
export const mk_some   = v  => {return { "prim": "Some", "args": [ v ] }}
export const mk_none   = () => {return { "prim": "None" }}
export const mk_rational = (n, d) => {return {  "prim": "Pair", "args": [ {  "int": n.toString()  }, {  "int": d.toString()  } ] }}

/* Code */

export const code = `{ storage nat ;
  parameter (unit %incr) ;
  code { CDR ; PUSH nat 1 ; DUP 2 ; ADD ; SWAP ; DROP 1 ; NIL operation ; PAIR } }
`

export const getStorage = () => {
  return {  "int": "0"  };
  }



