function solve(request) {
    validateRequest(request);
    return request;

    function getRequestValidators() {
        const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
        const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
        const uriRegex = /^[a-zA-Z0-9.]+$/;
        const messageRegex = /^[^<>\\&'"]*$/;

        const createValidator = (predicate) => (input) =>
            input != null && predicate(input);

        return {
            method: createValidator((m) => methods.includes(m)),
            uri: createValidator((u) => uriRegex.test(u)),
            version: createValidator((v) => versions.includes(v)),
            message: createValidator((m) => messageRegex.test(m)),
        };
    }

    function validateRequest(request) {
        const formattedProperties = {
            method: 'Method',
            uri: 'URI',
            version: 'Version',
            message: 'Message',
        };

        const requestValidators = getRequestValidators();

        Object.keys(requestValidators).forEach((key) => {
            if (!requestValidators[key](request[key])) {
                throw new Error(
                    `Invalid request header: Invalid ${formattedProperties[key]}`
                );
            }
        });
    }
}

// console.log(
//     solve({
//         method: 'GET',
//         uri: 'svn.public.catalog',
//         version: 'HTTP/1.1',
//         message: '',
//     })
// );

// console.log(
//     solve({
//         method: 'OPTIONS',
//         uri: 'git.master',
//         version: 'HTTP/1.1',
//         message: '-recursive',
//     })
// );

// console.log(
//     solve({
//         method: 'POST',
//         uri: 'home.bash',
//         message: 'rm -rf /*',
//     })
// );

console.log(
    solve({
        method: 'POST',
        version: 'HTTP/2.0',
        message: 'rm -rf /*',
    })
);
