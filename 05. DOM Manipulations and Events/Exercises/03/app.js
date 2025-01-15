function lockedProfile() {
    document
        .querySelector('main')
        .addEventListener('click', toggleUserInformationHandler);

    function toggleUserInformationHandler(e) {
        const profile = e.target.closest('.profile');

        if (
            e.target.nodeName !== 'BUTTON' ||
            profile.querySelector('input[value="lock"]:checked')
        ) {
            return;
        }

        const currentState = e.target.textContent;

        const updateState = toggleUserHiddenInformation(currentState, profile);

        e.target.textContent = updateState;

        function toggleUserHiddenInformation(currentState, profile) {
            if (currentState === 'Show more') {
                profile.querySelector('div[id$="HiddenFields"]').style.display =
                    'block';
                return 'Hide it';
            }
            profile.querySelector('div[id$="HiddenFields"]').style.display =
                    'none';
            return 'Show more';
        }
    }
}
