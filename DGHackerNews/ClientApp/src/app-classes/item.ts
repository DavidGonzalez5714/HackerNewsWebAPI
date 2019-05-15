/**HackerNews Item Model. should handle when properties are not returned in the api */
export interface IItem
{
    /**The item's unique id */
    id: number;
    /**true if the item is deleted */
    deleted: boolean | null;
    /**The type of item. One of "job", "story", "comment", "poll", or "pollopt". */
    type: string;
    /**The username of the item's author */
    by: string;
    /**Creation date of the item, in Unix Time. */
    time: number;
    /**The comment, story or poll text. HTML. */
    text: string;
    /**true if the item is dead. */
    dead: boolean | null;
    /**The comment's parent: either another comment or the relevant story */
    parent: number | null;
    /**The pollopt's associated poll. */
    poll: number | null;
    /**The ids of the item's comments, in ranked display order. */
    kids: number[];
    /**The URL of the story. */
    url: string;
    /**The story's score, or the votes for a pollopt. */
    score: number | null;
    /**The title of the story, poll or job. */
    title: string;
    /**A list of related pollopts, in display order. */
    parts: number[];
    /**In the case of stories or polls, the total comment count. */
    descendants: number;

}