# Delete with API router

> Add API route: `app/api/invoices/route.ts`
```ts
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

/*
    # DELETE
    curl -X DELETE http://localhost:3000/api/invoices \
         -H "Content-Type: application/json" \
         -d '{"id": "123"}'
 */
export async function DELETE(request: NextRequest): Promise<Response> {
    try {
        const body = (await request.json()) as { id: string };
        const { id: invoiceId } = body;

        // eslint-disable-next-line no-console
        console.log('Invoices DELETE Request Body: \n', invoiceId);

        if (!invoiceId) {
            return NextResponse.json({ error: 'Invoice ID is required.' }, { status: 400 });
        }

        // Delete Action
        await sql`DELETE FROM invoices WHERE id = ${invoiceId}`;

        return NextResponse.json({ message: 'Invoice was deleted successfully.' }, { status: 200 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        // eslint-disable-next-line no-console
        console.log('Invoices DELETE ERROR: \n', errorMessage);

        return NextResponse.json({ error: `Database Error: ${errorMessage}` }, { status: 500 });
    }
}

```

