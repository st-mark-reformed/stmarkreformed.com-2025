<?php

declare(strict_types=1);

namespace App\BlogEntries\PatchEntry;

use App\BlogEntries\EntryRepository;
use App\BlogEntries\EntryResult;
use App\BlogEntries\GetBlogEntryPage\EntryIds;
use App\Pages\PatchPage\ParseImageUploads;
use App\Persistence\Result;
use App\Profiles\ProfileRepository;
use DateTimeImmutable;
use DateTimeZone;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;

use function assert;
use function count;
use function is_array;

readonly class UpdateEntry
{
    public function __construct(
        private EntryRepository $entryRepository,
        private ParseImageUploads $parseImageUploads,
        private ProfileRepository $profileRepository,
    ) {
    }

    public function fromRequest(
        ServerRequestInterface $request,
        EntryIds $entryIds,
        EntryResult $entryResult,
    ): Result {
        if (
            ! $entryResult->hasEntry ||
            ! $entryResult->entry->blogPage->id->equals(
                $entryIds->blogPageId,
            )
        ) {
            return new Result(
                false,
                ['Page not found'],
            );
        }

        $errors = [];

        $entry = $entryResult->entry;

        $body = $request->getParsedBody();
        assert(is_array($body));

        try {
            $author = null;

            $authorId = (string) ($body['authorId'] ?? '');

            if ($authorId !== '') {
                $authorResult = $this->profileRepository->findProfileById(
                    $authorId,
                );

                if (! $authorResult->hasProfile) {
                    $errors[] = 'A valid author must be specified';
                } else {
                    $author = $authorResult->profile;
                }
            }

            $entry = $entry->withAuthor($author);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withName($body['name']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withSlug($body['slug']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withPath($body['path']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withStatus($body['status']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withType($body['type']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withData($body['data']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withJson($body['json']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $datePublished = $body['datePublished'];

            if ($datePublished !== null) {
                $datePublished = DateTimeImmutable::createFromFormat(
                    'Y-m-d H:i:s',
                    $datePublished,
                    new DateTimeZone('US/Central'),
                );

                if ($datePublished === false) {
                    $datePublished = null;
                }
            }

            $entry = $entry->withDatePublished($datePublished);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withUseShortHero(
                $body['useShortHero'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withUseCustomHero(
                $body['useCustomHero'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withHeroDarkeningOverlayOpacity(
                $body['heroDarkeningOverlayOpacity'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withHeroImage(
                $body['heroImage'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withHeroUpperCta($body['heroUpperCta']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withHeroHeading(
                $body['heroHeading'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withHeroSubHeading(
                $body['heroSubheading'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $entry = $entry->withHeroParagraph(
                $body['heroParagraph'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        if (count($errors) > 0) {
            return new Result(
                false,
                $errors,
            );
        }

        $entry = $this->parseImageUploads->fromFields($entry);

        $entry = $this->parseImageUploads->fromJson($entry);

        return $this->entryRepository->persistEntry($entry);
    }
}
