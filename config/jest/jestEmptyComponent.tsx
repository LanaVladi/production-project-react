import React from 'react';

// jest.config.ts => '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
// mock for all svg imports, which returns empty component

const jestEmptyComponent = function () {
    return <div />;
};

export default jestEmptyComponent;
