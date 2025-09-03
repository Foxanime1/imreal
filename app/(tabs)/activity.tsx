
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
import { theme } from '@/constants/theme';
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    position: 'relative',
  },
  unreadActivity: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: -theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 20,
  },
  username: {
    fontWeight: '600',
  },
  actionText: {
    color: theme.colors.textSecondary,
  },
  timestamp: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  postThumbnail: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.sm,
  },
  followBackButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.sm,
  },
  followBackText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '600',
  },
});