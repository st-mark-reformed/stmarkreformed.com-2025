<?php

declare(strict_types=1);

namespace App\Generator\PageBuilderBlockHandlers;

use App\Calendar\EventRepository;

use function array_map;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

readonly class UpcomingEventsHandler
{
    public function __construct(private EventRepository $eventRepository)
    {
    }

    /** @phpstan-ignore-next-line */
    public function handle(array $json): array
    {
        return array_map(
            fn (array $block) => $this->handleUpcomingEventsBlock(
                $block,
            ),
            $json,
        );
    }

    /** @phpstan-ignore-next-line */
    private function handleUpcomingEventsBlock(array $block): array
    {
        if ($block['type'] !== 'Features_UpcomingEvents') {
            return $block;
        }

        $calendarPage = $block['calendarPage'] ?? '';

        $block['events'] = $this->eventRepository->getUpcomingEvents(
            $calendarPage,
        )->asScalarArray();

        return $block;
    }
}
