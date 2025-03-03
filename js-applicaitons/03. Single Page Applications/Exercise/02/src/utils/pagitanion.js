const defaultPageSize = 5;

export function attachPaginationToUrl(url, pagitanionSettings) {
    const pagitaionUrl = new URL(url);
    const { page, pageSize } = pagitanionSettings;
    pagitaionUrl.searchParams.append('pageSize', pageSize + 1);
    pagitaionUrl.searchParams.append('offset', page * pageSize);
    return pagitaionUrl;
}

export function createPagationSettings() {
    return {
        pageSize: defaultPageSize,
        page: 0,
        hasNext: false,
        hasePrev: false,
    };
}

export function updatePaginationSettings(pagitanionSettings, responeSize, direction) {
    pagitanionSettings.page = direction === 'next' ? pagitanionSettings.page + 1 : pagitanionSettings.page - 1;
    pagitanionSettings.hasePrev = pagitanionSettings.page > 1;
    pagitanionSettings.hasNext = responeSize > pagitanionSettings.pageSize;
}

export function resetPagitationSettings(pagitanionSettings) {
    Object.assign(pagitanionSettings, createPagationSettings());
}
