import type { ActionArgs, LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { db } from "~/utils/db.server";

export async function loader({params}: LoaderArgs) {

try {
    const data = await db.comment.findMany({

         where: {
            movieId: params.id,
         },
         orderBy: {
            createdAt: "desc",
        }
    });
    console.log('Fetched comments:', data)
    return json({data})
} catch(error) {
    console.log('Error while fetching comments: ', error)
    return json({data: []});
}
}

export async function action({request}: ActionArgs) {

try {
    const formData = await request.formData()
    const data = await db.comment.create({
        data: {
            message: formData.get('comment') as string,
            movieId: formData.get('id') as any
        }
    });
    console.log('Comment created: ', data)
    return json({ data });
} catch(error) {
    console.log('Error creating comment: ', error);
    return json({error: 'Failed to create comment'})
}
} 

export default function Comments() {
    const id = useParams();
    const {data: comments} = useLoaderData<typeof loader>();
    console.log('Loaded comments: ', comments);

    let navigation = useNavigation();
    let isSubmitting = navigation.state === 'submitting';
    
    let formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current?.reset();
        }
    }, [isSubmitting])

    return (
        <div className="rounded-lg border p-3">
            <p className="text-2xl font-semibold mb-5">Comment on the movie</p>
            <div className="">
                <Form 
                        method="POST"
                        ref={formRef}     
                >

                    <textarea id="comment" name="comment" aria-label="Comment" placeholder="Enter your comment here..." className="w-full border border-teal-500 rounded-lg p-2">
                    </textarea>
                    <input type="hidden" name="id" value={id.id}/>

                    <button 
                    type="submit" 
                    className="bg-teal-500 px-4 py-2 rounded-lg text-white" 
                    disabled={isSubmitting}
                    name={'_action'}
                    value={'create'}
                    >
                    {isSubmitting ? 'Submitting comment...' : 'Submit comment'}
                    </button>
                  
                </Form>

                <div className="mt-5">
                    {comments.map((comment: any) => (
                        <div key={comment.id} className="border-t-2 border-teal-500 pb-4">
                            <p className="font-semibold text-teal-500">
                            <span className="">{new Date(comment.createdAt).toLocaleString()}</span>
                            </p>
                            <p className="text-2xl">
                            <span className="text-2xl">{comment.message}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}