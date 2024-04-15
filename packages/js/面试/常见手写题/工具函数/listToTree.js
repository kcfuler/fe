function listToTree(list) {
    let m = new Map();
    for (const item of list) {
        m.set(item.id, item);
    }

    let ans = [];
    for (const item of list) {
        if (item.parent !== null) {
            const parent = m.get(item.parent);
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push(item);
        } else {
            ans.push(item);
        }
    }

    return ans;
}

function listToTreeImmutable(list) {
    
}
