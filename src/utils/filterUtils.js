// 카테고리 필터에서 사용하는 '전체' 옵션 상수
export const ALL_CATEGORY = '전체';

/**
 * 카테고리 기준으로 관광지 목록을 걸러 반환한다.
 * category가 '전체'이면 원본을 그대로 반환한다.
 */
export const filterByCategory = (items, category) => {
  if (!category || category === ALL_CATEGORY) {
    return items;
  }
  return items.filter((item) => item.category === category);
};
