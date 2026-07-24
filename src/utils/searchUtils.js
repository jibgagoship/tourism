/**
 * 검색어를 관광지 이름과 설명(summary/content)에 대해 대소문자 구분 없이 매칭한다.
 * 검색어가 비어 있으면 원본을 그대로 반환한다.
 */
export const searchAttractions = (items, keyword) => {
  const query = (keyword || '').trim().toLowerCase();
  if (!query) {
    return items;
  }

  return items.filter((item) => {
    const haystack = [item.name, item.summary, item.content]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
};

/**
 * 간단한 debounce 유틸 (외부 의존성 없이).
 * 입력이 짤 검색창 등에서 호출 빈도를 제한할 때 사용한다.
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
