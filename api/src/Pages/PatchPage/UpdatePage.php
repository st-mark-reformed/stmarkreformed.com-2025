<?php

declare(strict_types=1);

namespace App\Pages\PatchPage;

use App\Pages\Page\PageResult;
use App\Pages\PageRepository;
use App\Persistence\Result;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;

use function assert;
use function count;
use function is_array;

readonly class UpdatePage
{
    public function __construct(
        private PageRepository $pageRepository,
        private ParseImageUploads $parseImageUploads,
    ) {
    }

    public function fromRequest(
        ServerRequestInterface $request,
        PageResult $pageResult,
    ): Result {
        if (! $pageResult->hasPage) {
            return new Result(
                false,
                ['Page not found'],
            );
        }

        $errors = [];

        $page = $pageResult->page;

        $body = $request->getParsedBody();
        assert(is_array($body));

        try {
            $page = $page->withName($body['name']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withSlug($body['slug']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withPath($body['path']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withStatus($body['status']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withType($body['type']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withData($body['data']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withJson($body['json']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withShowInMenu(
                $body['showInMenu'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withShowSubPageSidebar(
                $body['showSubPageSidebar'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withUseShortHero(
                $body['useShortHero'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withUseCustomHero(
                $body['useCustomHero'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withHeroDarkeningOverlayOpacity(
                $body['heroDarkeningOverlayOpacity'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withHeroImage(
                $body['heroImage'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withHeroUpperCta($body['heroUpperCta']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withHeroHeading(
                $body['heroHeading'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withHeroSubHeading(
                $body['heroSubheading'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $page = $page->withHeroParagraph(
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

        $page = $this->parseImageUploads->fromPageFields($page);

        $page = $this->parseImageUploads->fromPageJson($page);

        return $this->pageRepository->persistPage($page);
    }
}
