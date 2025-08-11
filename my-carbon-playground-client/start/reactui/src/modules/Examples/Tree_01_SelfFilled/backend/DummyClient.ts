export async function captureTree() 
{
    let data = [
        {
            id: "1",
            label: "First Node",
            isExpanded: true,
            children: [
                { id: "1-1", label: "Child 1", isExpanded: true, },
                { id: "1-2", label: "Child 2", isExpanded: true, },
            ],

        },
        {
            id: "2",
            label: "Second Node",
            isExpanded: true,
            children: []
        },
    ];
    return data;
}