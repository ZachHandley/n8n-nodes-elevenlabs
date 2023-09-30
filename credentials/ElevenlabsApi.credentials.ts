import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ElevenLabsApi implements ICredentialType {
	name = 'elevenLabsApi';
	displayName = 'ElevenLabs API';
	documentationUrl = 'https://github.com/zachhandley/n8n-nodes-elevenlabs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				"xi-api-key": '={{$credentials.apiKey}}',
				"accept": "application/json",
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.elevenlabs.io/v1',
			url: '/voices',
		},
	};
}
