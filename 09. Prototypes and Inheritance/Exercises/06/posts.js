function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return (`Post: ${this.title}\nContent: ${this.content}`).trim();
        }
    }

    class SocialMediaPost extends Post {
        comments = [];

        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        #formateComments() {
            if (this.comments.length == 0) return '';
            const formatedComments = this.comments
                .map((c) => ` * ${c}`)
                .join('\n');
            return `Comments:\n${formatedComments}`;
        }

        toString() {
            const rating = this.likes - this.dislikes;
            return (`${super.toString()}\nRating: ${rating}\n${this.#formateComments()}`).trim();
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view() {
            this.views++;
            return this;
        }

        toString() {
            return (`${super.toString()}\nViews: ${this.views}`).trim();
        }
    }
    return {Post, SocialMediaPost, BlogPost};
}

const classes = solve();
let post = new classes.Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new classes.SocialMediaPost("TestTitle", "TestContent", 25, 30);

// scm.addComment("Good post");
// scm.addComment("Very good post");
// scm.addComment("Wow!");

console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!