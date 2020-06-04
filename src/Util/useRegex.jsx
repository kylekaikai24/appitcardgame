export const UseRegex = (string) => {
  // regex for English/Chinese/Chinese contain symbol
  const reg = /^[a-z0-9]{1,10}$/i;
  const reg_chi = /^[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]$/u;
  const reg_symbol = /[-@#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  if (string.match(reg)) {
    console.log(string.match(reg));
    return true;
  } else if (
    string.match(reg_chi) &&
    !string.match(reg_symbol) &&
    string.length > 0 &&
    string.length < 11
  ) {
    console.log(string.match(reg_chi));
    return true;
  } else {
    return false;
  }
};
