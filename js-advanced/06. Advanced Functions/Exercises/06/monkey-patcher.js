function solve(action) {
    const actionsHandlers = {
        upvote: () => {
            this.upvotes++;
        },
        downvote: () => {
            this.downvotes++;
        },
        score: () => {
            const updateVotes = proccessVotes(this.upvotes, this.downvotes);
            const balance = this.upvotes - this.downvotes;
            const score = extractScore(this.upvotes, this.downvotes);
            return [...updateVotes, balance, score];
        },
    };

    function proccessVotes(upvotes, downvotes) {
        const totalVotes = upvotes + downvotes;
        if (totalVotes <= 50) return [upvotes, downvotes];
        const inflateNumber = Math.ceil(
            0.25 * Math.max(upvotes, downvotes)
        );
        return [upvotes + inflateNumber, downvotes + inflateNumber];
    }

    function extractScore(upvotes, downvotes) {
        const totalVotes = upvotes + downvotes;
        if (totalVotes < 10) {
            return 'new';
        }

        const balance = upvotes - downvotes;
        if ((upvotes / totalVotes) * 100 > 66) {
            return 'hot';
        }
        if (balance >= 0 && totalVotes > 100) {
            return 'controversial';
        }
        if (balance < 0) {
            return 'unpopular';
        }
        return 'new';
    }

    return actionsHandlers[action]();
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100,
};

solve.call(post, 'upvote');
solve.call(post, 'downvote');
let score = solve.call(post, 'score');
console.log(score); // [127, 127, 0, 'controversial']
for(let i = 0; i < 50; i++) {
    solve.call(post, 'downvote');         // (executed 50 times)
}
score = solve.call(post, 'score');
console.log(score);
