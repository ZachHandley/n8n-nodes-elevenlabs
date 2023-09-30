import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const voicesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['voices'],
			},
		},
		options: [
			{
				name: 'GET',
				value: 'get',
				action: 'Get a list of available voices to use',
				routing: {
					request: {
						method: 'GET',
						url: '/voices',
					},
				},
			},
			{
				name: 'GET Default Settings',
				value: 'getDefaultSettings',
				action: 'Get default settings for a voice',
				routing: {
					request: {
						method: 'GET',
						url: '/voices/settings/default',
					},
				},
			},
			{
				name: 'Get Voice Settings',
				value: 'getVoiceSettings',
				action: 'Get settings for a specific voice',
				routing: {
					request: {
						method: 'GET',
						url: '/voices/{{$value}}/settings',
					},
				},
			},
			{
				name: 'Edit Voice Settings',
				value: 'editVoiceSettings',
				action: 'Edit settings for a specific voice',
				routing: {
					request: {
						method: 'POST',
						url: '/voices/{{$voiceId}}/settings',
					},
				},
			},
		],
		default: 'get',
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const voicesOpFields: INodeProperties[] = [
	{
		displayName: 'Voice ID',
		name: 'voiceId',
		default: '',
		description: 'The Voice ID to send with the request',
		requiresDataPath: 'single',
		displayOptions: {
			show: {
				resource: ['voices'],
				operation: ['getVoiceSettings', 'editVoiceSettings'],
			},
		},
		type: 'string',
		required: true,
	},
	{
		displayName: 'Voice Settings',
		name: 'voiceSettings',
		default: '',
		description: 'The Voice Settings to send with the request',
		requiresDataPath: 'multiple',
		placeholder: 'Add Voice Settings',
		displayOptions: {
			show: {
				resource: ['voices'],
				operation: ['editVoiceSettings'],
			},
		},
		routing: {
			request: {
				body: {
					data: '={{ "similarity_boost": $voiceSettings.similarityBoost, "stability": $voiceSettings.stability, "style": $voiceSettings.style, "use_speaker_boost": $voiceSettings.useSpeakerBoost }}',
				},
			}
		},
		type: 'fixedCollection',
		options: [
			{
				displayName: 'Similarity Boost',
				name: 'similarityBoost',
				description: 'Similarity Boost is a value between 0 and 1 that determines how much the voice should try to sound like the original speaker. 0 means the voice will sound like the original speaker, 1 means the voice will sound like the default voice.',
				value: 'similarityBoost',
				type: 'number',
				default: 0.5,
				typeOptions: {
					maxValue: 1,
					minValue: 0,
					numberStepSize: 0.05,
				},
				requiresDataPath: 'single',
			},
			{
				displayName: 'Stability',
				name: 'stability',
				description: 'Stability is a value between 0 and 1 that determines how much the voice should try to sound like the original speaker. 0 means the voice will sound like the original speaker, 1 means the voice will sound like the default voice.',
				value: 'stability',
				type: 'number',
				default: 0.5,
				typeOptions: {
					maxValue: 1,
					minValue: 0,
					numberStepSize: 0.05,
				},
				requiresDataPath: 'single',
			},
			{
				displayName: 'Style',
				name: 'style',
				description: 'I\'m not quite sure what this does yet, but it\'s in their API documentation',
				value: 'style',
				type: 'number',
				default: 0,
				requiresDataPath: 'single',
			},
			{
				displayName: 'Use Speaker Boost?',
				name: 'useSpeakerBoost',
				description: 'Whether the voice should use speaker boost or not.',
				default: true,
				type: 'boolean',
				requiresDataPath: 'single',
			},
		],
	},
	{
		displayName: 'Query Parameters',
		name: 'arguments',
		default: {},
		description: "The request's query parameters",
		displayOptions: {
			show: {
				resource: ['httpVerb'],
				operation: ['get'],
			},
		},
		options: [
			{
				name: 'keyvalue',
				displayName: 'Key:Value',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						required: true,
						description: 'Key of query parameter',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: '={{$parent.key}}',
								type: 'query',
							},
						},
						required: true,
						description: 'Value of query parameter',
					},
				],
			},
		],
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
	},
];

export const voicesFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                voices:operations                           */
	/* -------------------------------------------------------------------------- */
	...voicesOperations,
	/* -------------------------------------------------------------------------- */
	/*                                voices:fields                               */
	/* -------------------------------------------------------------------------- */
	...voicesOpFields,
];
