function deepCloneComplete(obj, map){
  if( typeof obj !== 'object' || obj === null)
    return obj;
  const constructor = obj.constructor;
  if( /^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
    return new constructor(obj);
  if( map.has(obj) )
    return map.get(obj);
  map.set(obj, true);
  const result = Array.isArray(obj)? [] : {};
  for( let key in obj ){
    if( obj.hasOwnProperty(key)){
      result[key] = deepCloneComplete(obj[key], map);
    }
  }
  return result;
}
