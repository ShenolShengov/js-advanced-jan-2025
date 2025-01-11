function solve(studentsData) {
    studentsData = JSON.parse(studentsData);

    logWithIndent('<table>', 0);
    logColumns(studentsData);
    logData(studentsData);
    logWithIndent('</table>', 0);

    function logData(studentsData) {
        studentsData
            .map((singleStudentData) => {
                return Object.values(singleStudentData)
                    .map((d) => escapeHtml(d))
                    .map((p) => wrapIn(p, 'td'))
                    .join('');
            })
            .map((s) => wrapIn(s, 'tr'))
            .forEach((s) => logWithIndent(s, 2));
    }

    function escapeHtml(text) {

        const escapedCharacters = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
        };

        return text.toString().replace(/[&<>"–—©®™≈≠£€° ]/g, m => escapedCharacters[m] || '&nbsp;');
    }

    function logColumns(studentsData) {
        const columns = Object.keys(studentsData[0]).map((c) => 
        escapeHtml(c));

        const concatenatedColmuns = columns.reduce(
            (allColmuns, currentColumn) =>
                (allColmuns += wrapIn(currentColumn, 'th')),
            ''
        );
        const wrapedColmuns = wrapIn(concatenatedColmuns, 'tr');
        logWithIndent(wrapedColmuns, 2);
    }

    function wrapIn(text, tag) {
        return `<${tag}>${text}</${tag}>`;
    }

    function logWithIndent(text, indent) {
        console.log(' '.repeat(indent) + text);
    }
}

// solve(`[{"Name":"Stamat",
// "Score":5.5},
// {"Name":"Rumen",
// "Score":6}]`);

solve(`[{"Name>":"Pesho<",
"Score":4,
" Grade":8},
{"Name":"Gosho>",
"Score":5,
" Grade":8},
{"Name":"Angel",
"Score":5.50,
" Grade":10}]`);
