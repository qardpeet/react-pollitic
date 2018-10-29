const cancelablePromise = promise => {
    let hasCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            response => (hasCanceled ? reject({ isCanceled: true, response }) : resolve(response)),
            error => reject({ isCanceled: hasCanceled, error }),
        );
    });

    return {
        promise: wrappedPromise,
        cancel: () => (hasCanceled = true),
    };
};

export default cancelablePromise;