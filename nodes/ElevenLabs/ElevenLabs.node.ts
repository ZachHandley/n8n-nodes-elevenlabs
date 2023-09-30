import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { httpVerbFields, httpVerbOperations } from './ModelsDescription';

export class ElevenLabs implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ElevenLabs',
		name: 'elevenLabs',
		icon: 'file:elevenlabs.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ElevenLabs Text-to-Speech API and generate your own voices!',
		defaults: {
			name: 'ElevenLabs',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'elevenLabsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.elevenlabs.io/v1/',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'xi-api-key': '={{$credentials.apiKey}}',
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Models',
						value: 'models',
					},
					{
						name: "Voices",
						value: "voices",
					},
					{
						name: "Samples",
						value: "samples",
					},
					{
						name: "History",
						value: "history",
					},
					{
						name: "User",
						value: "user",
					},
				],
				default: 'voices',
			},
			// PUT OPERATIONS AND FIELDS HERE
		],
	};
}
