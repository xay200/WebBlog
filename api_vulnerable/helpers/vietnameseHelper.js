export const removeVietnameseTones = (str) => {
  if (!str) return "";

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();
};

export const getVietnameseVariants = (char) => {
  const map = {
    a: "aàáảãạăằắẳẵặâầấẩẫậAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬ",
    e: "eèéẻẽẹêềếểễệEÈÉẺẼẸÊỀẾỂỄỆ",
    i: "iìíỉĩịIÌÍỈĨỊ",
    o: "oòóỏõọôồốổỗộơờớởỡợOÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢ",
    u: "uùúủũụưừứửữựUÙÚỦŨỤƯỪỨỬỮỰ",
    y: "yỳýỷỹỵYỲÝỶỸỴ",
    d: "dđDĐ",
  };

  const lowerChar = char.toLowerCase();
  return map[lowerChar] || char;
};

export const createFlexibleVietnamesePattern = (query) => {
  if (!query) return "";

  const normalizedQuery = removeVietnameseTones(query);

  return normalizedQuery
    .split("")
    .map((char) => {
      const variants = getVietnameseVariants(char);
      return variants.length > 1 ? `[${variants}]` : char;
    })
    .join("");
};
