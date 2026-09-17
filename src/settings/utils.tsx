import type { FormInstance } from 'antd';
import type { AnyType } from '@/common/types';

export const defaultTTSValue = `{
	"doubao": {
		"request_body": {
			"namespace": "",
			"req_params": {
				"audio_params": {
					"format": "mp3",
					"sample_rate": 24000
				},
				"model": "",
				"speaker": "zh_female_vv_uranus_bigtts",
				"text": ""
			},
			"user": {
				"uid": ""
			}
		},
		"request_header": {
			"X-Api-Access-Key": "",
			"X-Api-App-Id": "",
			"X-Api-Request-Id": "",
			"X-Api-Resource-Id": "seed-tts-2.0",
			"X-Control-Require-Usage-Tokens-Return": ""
		},
		"url": "https://openspeech.bytedance.com/api/v3/tts/unidirectional"
	},
	"mimo": {
		"base_url": "https://api.xiaomimimo.com/v1",
		"api_key": "",
		"voice": "mimo_default",
		"audio_format": "wav",
		"stream": false,
		"timeout": 300,
		"auto_model": true,
		"voice_prompt": "",
		"style_prompt": [],
		"context_texts": [],
		"audio_tags": [],
		"emotion": "",
		"speaking_rate": "",
		"pitch": "",
		"volume": "",
		"dialect": "",
		"voice_clone_audio": "",
		"voice_clone_mime_type": "audio/mpeg"
	}
}`;

export const defaultAIDrawingValue = `{
	"JiMeng": {
		"enabled": true,
		"base_url": "http://jimeng-api:9000",
		"sessionid": ["xxxxxx"],
		"sample_strength": 0.5,
		"resolution": "2k",
		"ratio": "16:9",
		"response_format": "url"
	},
	"DouBao": {
		"enabled": true,
		"api_key": "xxxxxxx",
		"size": "2K",
		"response_format": "url",
		"watermark": false
	},
	"GLM": {
		"enabled": true
	},
	"Z-Image": {
		"enabled": true,
		"base_url": "https://api-inference.modelscope.cn/",
		"api_key": "xxxxxxx"
	},
	"OpenAI": {
		"enabled": true,
		"base_url": "https://new-api.houhoukang.com",
		"api_key": "",
		"n": 1,
		"size": "auto",
		"quality": "auto",
		"background": "auto",
		"output_format": "png"
	}
}`;

export const defaultAIPodcastValue = `{
	"DouBao": {
		"app_id": "xxxxxxx",
		"access_key": "xxxxxxx",
		"resource_id": "volc.service_type.10050"
	}
}`;

export const onTTSEnabledChange = (form: FormInstance<AnyType>, checked: boolean) => {
	if (checked) {
		if (!form.getFieldValue('tts_settings')) {
			form.setFieldsValue({
				tts_settings: defaultTTSValue as unknown as object,
			});
		}
	}
};

export const ObjectToString = <
	T extends {
		image_ai_settings?: object;
		tts_settings?: object;
		podcast_config?: object;
		wxhb_notify_member_list?: string;
	},
>(
	data: T,
) => {
	if (data.image_ai_settings && typeof data.image_ai_settings === 'object') {
		data.image_ai_settings = JSON.stringify(data.image_ai_settings, null, 2) as unknown as object;
	}
	if (data.tts_settings && typeof data.tts_settings === 'object') {
		data.tts_settings = JSON.stringify(data.tts_settings, null, 2) as unknown as object;
	}
	if (data.podcast_config && typeof data.podcast_config === 'object') {
		data.podcast_config = JSON.stringify(data.podcast_config, null, 2) as unknown as object;
	}
	if (data.wxhb_notify_member_list && typeof data.wxhb_notify_member_list === 'string') {
		data.wxhb_notify_member_list = data.wxhb_notify_member_list.split(',') as unknown as string;
	} else {
		data.wxhb_notify_member_list = [] as unknown as string;
	}
};

export const parseSettingsJSON = (value: unknown, label: string) => {
	try {
		const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
		if (!parsedValue || typeof parsedValue !== 'object' || Array.isArray(parsedValue)) {
			throw new Error();
		}
		return parsedValue as Record<string, unknown>;
	} catch {
		throw new Error(`${label}格式错误，不是有效的JSON对象格式`);
	}
};

export const chatBaseURLTips = (
	<>
		示例:{' '}
		<a
			href="https://new-api.houhoukang.com/"
			target="_blank"
			rel="noreferrer"
		>
			https://new-api.houhoukang.com/
		</a>
		，或者 https://new-api.houhoukang.com/v1 或者
		https://new-api.houhoukang.com/v2，如果不是以版本号结尾，会自动补全一个/v1
	</>
);

export const imageRecognitionModelTips = (
	<>
		<p>图像识别模型是用来识别用户上传的图片内容的。</p>
		<p>解决某些大模型文字输出效果很好，但是不支持图像识别的问题</p>
	</>
);

export const mediaExtractKeywordsTips = (
	<>
		<p>用户在群里<strong>引用图片/表情包</strong>并附带这些关键词时，机器人会把图片提取并重新发送给用户。</p>
		<p>多个关键词用英文逗号分隔，例如：<code>提取,下载,保存,发给我</code>。</p>
		<p>留空使用默认值：提取表情包/下载表情包/保存表情包/提取表情/下载表情/发给我/发我/提取图片/下载图片/保存图片/提取/下载/保存/转化/转换/做成表情包/变成表情包</p>
	</>
);

export const mediaEvaluateKeywordsTips = (
	<>
		<p>用户在群里<strong>引用图片/表情包</strong>并附带这些关键词时，机器人会调用<strong>图像识别模型</strong>分析图片内容并回复（不重新发送图片）。</p>
		<p>多个关键词用英文逗号分隔，例如：<code>评价,识别,分析,这是什么</code>。</p>
		<p>留空使用默认值：如何评价/怎么评价/评价一下/评价/识别一下/识别/分析一下/分析/这是什么/这是啥/是什么/怎么样/如何/怎么看/解读/描述一下/说一下/讲讲</p>
	</>
);

export const mediaExtractFailTextTips = (
	<>
		<p>引用图片/表情包提取失败时（如未开启图片自动上传、上传或发送出错）机器人发给用户的提示文本。</p>
		<p>留空使用默认文案。</p>
	</>
);

export const mediaRecognizeFailTextTips = (
	<>
		<p>引用图片识别/评价失败时机器人发给用户的提示文本（如模型调用失败、图片下载失败）。</p>
		<p>留空使用默认文案。</p>
	</>
);

export const mediaRecognizeEmptyTextTips = (
	<>
		<p>图片识别模型返回空结果时机器人发给用户的提示文本。</p>
		<p>留空使用默认文案。</p>
	</>
);

export const summaryMinMessagesTips = (
	<>
		<p>每日自动总结（9点 cron）与手动触发总结时，统计时间窗口内的消息数量。</p>
		<p>如果消息数低于此阈值，机器人会回复“聊天不够活跃啊~~~”且不生成总结。</p>
		<p>默认 100 条。</p>
	</>
);

export const summaryTriggerKeywordsTips = (
	<>
		<p>群里 @机器人 + 这些关键词 的任意一个，会<strong>立即触发</strong>当前群的聊天记录总结（不是等每日9点）。</p>
		<p>多个关键词用英文逗号分隔，例如：<code>总结,总结一下,群总结</code>。</p>
		<p>注意：仅对已开启「群聊总结」的群生效。</p>
	</>
);

export const summaryWindowHoursTips = (
	<>
		<p>手动触发总结时，向后回溯统计<strong>最近 N 小时</strong>的聊天记录。</p>
		<p>默认 24（即最近一天）。例如设为 48 则总结最近两天。</p>
	</>
);
