import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const modelsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['models'],
			},
		},
		options: [
			{
				name: 'GET',
				value: 'get',
				action: 'Get a list of available models',
				routing: {
					request: {
						method: 'GET',
						url: '/models',
					},
				},
			},
		],
		default: 'get',
	},
];

export const modelsFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                httpVerb:get                                */
	/* -------------------------------------------------------------------------- */
	...modelsOperations,
];
