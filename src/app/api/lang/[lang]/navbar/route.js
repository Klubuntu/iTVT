import fs from 'fs';
import path from 'path';

export async function POST(req) {
    return new Response('Method not allowed', { status: 501 });
}

export async function GET(req, props) {
    const params = await props.params;
    const paramLang = params.lang;
    const packageDir = process.cwd();
    const jsonLang = `${packageDir}/src/json/lang/${paramLang}/navbar.json`;

    if (fs.existsSync(jsonLang)) {
        try {
            const data = await fs.promises.readFile(jsonLang, 'utf8');
            const output = JSON.parse(data);
            return new Response(JSON.stringify(output), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            console.error(err);
            return new Response(JSON.stringify({ error: 'Failed to read file.' }), {
                status: 500,
            });
        }
    } else {
        return new Response(JSON.stringify({ error: 'Invalid lang code.' }), {
            status: 404,
        });
    }
}
